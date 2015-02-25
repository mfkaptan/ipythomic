# ipythomic
A basic example of visualizing real-time data interactively in IPython notebook using microphone input.

This project is just a proof of concept.
Python is used for accessing the microphone's data and Javascript is used for visualizations.
The connection between Python and Javascript has been established with IPython notebook (IPython widgets).

###Running
After cloning the repo, just open the ipythomic_demo.ipynb in IPython notebook.

Don't have a microphone? Try redirecting your speakers to your microphone! It is easy:
- Install pavucontrol (`$ sudo apt-get install pavucontrol`)
- Open some music and open pavucontrol
- Click 'Recording' tab
- Select 'Monitor of Built-in Stereo' (Try re-running the notebook demo if you don't see it)

###Requirements & Other Libraries
- IPython (version > 2.0)
- Processingjs (included)
- Alsaaudio (`$ sudo apt-get install python-alsaaudio`)

Tested on Ubuntu 14.04
