# ipythomic

[![Join the chat at https://gitter.im/mfkaptan/ipythomic](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mfkaptan/ipythomic?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
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
- IPython notebook (version >= 3.0)
- Processingjs (included)
- Alsaaudio (`$ sudo apt-get install python-alsaaudio`)

Tested on Ubuntu 14.04
