# sam-lambda-typescript-tutorial

## Project Setup

Install the following tools and frameworks:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/download/releases/), 8.10.x
- [Python](https://www.python.org/downloads/), 3.7.x

With the following commands, install `AWS CLI` and `AWS SAM CLI`:

```
python --version
pip --version

pip install awscli --upgrade --user
pip install aws-sam-cli

aws --version
sam --version
```

Next, create the project folder and initialize it using npm and git.

```
mkdir sam-lambda-typescript-tutorial
cd sam-lambda-typescript-tutorial
npm init -y
git init
echo '# sam-lambda-typescript-tutorial' >> README.md
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/{your-username}/{your-repository-name}.git
git push -u origin master
```

Typescript

```
npm i -D typescript @types/node @types/aws-lambda
npx tsc --init
```
