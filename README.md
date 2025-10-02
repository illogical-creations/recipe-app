## Recipe App
A simple web app for recipes, with scaling feature for ingredient list quantities.

## Structure
The main page is a list of the currently stored recipes, each a URL to the respective viewer page.

Viewer pages are structured with the quantity the entered ingredients would initially make and a scaling option for ingredients to make a different quantity, followed by an ingredients list and a numbered list of entered steps.

Another link on the main page opens a form to add recipes, with variable length (via buttons) list inputs to populate the ingredients and steps. 

Currently removal and editing are not explicitly supported, although adding a new recipe with the same name as an existing one allows replacement with new information.

## Technical
The site backend is written in Python 3, using the Flask web framework, and a flat json file database provided by pysondb. 

### Suggested Deployment
The app is not designed for operation at scale, nor with users and authentication. If not deploying using the Flask development server (`python3 app.py`), I suggest using the included gunicorn configuration, which will host on local port 8080, intended to be accessed via a reverse proxy (I use nginx). Please note the use of a single worker, due to unknown behaviour of the database with multiple workers.

### Example Setup
An example setup of the development server on a linux computer, such as a raspberry pi, which you may want to use to host and/or develop the app. Assumes you already have Python 3 and pip installed, and are happy to access the development server on a specific port (by default, 5000).

Clone the repository to your computer:
```
git clone https://github.com/illogical-creations/recipe-app.git
```
Change working directory to the cloned repository:
```
cd recipe-app/
```
Install the required libraries:
```
pip3 install -r requirements.txt
```
Run the app directly, which will start the development server:
```
python3 app.py
```

By default, the server is configured to listen to requests on all your computer's ip addresses, on port 5000 (`0.0.0.0:5000`), meaning other devices which can talk to your computer can load the page. The Flask development server also has an option to automatically reload on file changes, which for this app is preconfigured to be on, meaning you can get started making your changes right away. On the same computer you run the app, you can usually load the main page in a web browser at http://localhost:5000.
