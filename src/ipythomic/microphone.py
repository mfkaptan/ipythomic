import alsaaudio
import audioop
import os.path as op

try:
    import tornado
    import IPython
    IPYTHON_VERSION = IPython.version_info[0]
    if IPYTHON_VERSION < 2:
        raise RuntimeError('Requires IPython >= 2.0')
    from IPython.html.widgets import DOMWidget
    from IPython.utils.traitlets import Unicode, Int
    from IPython.display import display, Javascript
    from IPython.html.nbextensions import install_nbextension

except Exception as exp:
    print exp


class MicrophoneWidget(DOMWidget):
    _view_name = Unicode("MicrophoneWidget", sync=True)
    value = Int(sync=True)

    def __init__(self, **kwargs):
        super(MicrophoneWidget, self).__init__(**kwargs)
        self.inp = alsaaudio.PCM(alsaaudio.PCM_CAPTURE, alsaaudio.PCM_NONBLOCK)
        # Set attributes: Mono, 8000 Hz, 16 bit little endian samples
        self.inp.setchannels(1)
        self.inp.setrate(8000)
        self.inp.setformat(alsaaudio.PCM_FORMAT_S16_LE)
        self.inp.setperiodsize(160)

        # Copy necessary javascript files
        self._prepare_js()

        # For calling a function continuously add it to ioloop callback list
        self.ioloop = tornado.ioloop.IOLoop.current()  # IPython's
        self.ioloop.add_callback(self.get_level)

    def get_level(self):
        # Read data from device
        l, data = self.inp.read()
        if l:
            # Return the maximum of the absolute value of
            # all samples in a fragment.
            # For visualization purposes shrink it by dividing
            self.value = audioop.max(data, 2) / 50

        # Call this function again
        self.ioloop.add_callback(self.get_level)

    def _prepare_js(self):
        pkgdir = op.dirname(__file__)
        jsdir = op.join(pkgdir, '../js')
        install_nbextension(op.join(jsdir, 'processing.min.js'))
        install_nbextension(op.join(jsdir, 'ipythomic.js'))
        micvis_path = op.join(jsdir, 'micvis.js')
        with open(micvis_path, 'r') as f:
            script = f.read()
        display(Javascript(script))
