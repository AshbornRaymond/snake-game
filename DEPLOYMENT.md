# Deploying Your Snake Game to GitHub Pages

This guide will walk you through the steps to deploy your Snake game as a live web application using GitHub Pages, which provides free hosting for static websites.

## Prerequisites

- A GitHub account (sign up at [github.com](https://github.com) if you don't have one)
- Git installed on your computer

## Deployment Steps

### 1. Create a GitHub Repository

1. Log in to your GitHub account
2. Click the '+' icon in the top-right corner and select 'New repository'
3. Name your repository (e.g., 'snake-game')
4. Choose 'Public' visibility
5. Click 'Create repository'

### 2. Push Your Code to GitHub

Run the following commands in your terminal, replacing `YOUR_USERNAME` with your GitHub username and `REPOSITORY_NAME` with the name you chose for your repository:

```bash
# Navigate to your project directory if you're not already there
cd "path/to/snake-game"

# Initialize Git repository (if not already done)
git init

# Add all files to staging
git add .

# Commit the files
git commit -m "Initial commit"

# Add the remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

### 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on 'Settings' tab
3. Scroll down to the 'GitHub Pages' section
4. Under 'Source', select 'main' branch
5. Click 'Save'

GitHub will process your request and provide you with a URL where your site is published (usually in the format `https://YOUR_USERNAME.github.io/REPOSITORY_NAME`).

### 4. Access Your Live Snake Game

After a few minutes, your Snake game will be available at the URL provided by GitHub Pages. You can share this URL with anyone to let them play your game!

## Updating Your Game

Whenever you want to make changes to your game:

1. Make your changes locally
2. Commit and push them to GitHub:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically update your live site with the new changes.

## Troubleshooting

- If your site doesn't appear, check that you've selected the correct branch in the GitHub Pages settings
- Make sure your repository is public
- Verify that your index.html file is in the root of your repository
- Check for any error messages in the GitHub Pages section of your repository settings

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) (if you want to use your own domain name)