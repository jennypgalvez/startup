# CS 260 Notes

This file represents what I have learned about web programming.

- [My startup](https://startup.mindwall.click)
- [My simon](https://simon.mindwall.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

this is a test
Interesting things I have learned about AWS

- AWS EC2 Server Setup Notes
    - **AMI USED**  "ami-094c4a0be0b642a24" (CS 260 Class AMI)
    - **Public IP Address:** "3.222.238.243"
- SSH Connection Command
To connect from my computer using SSH:
    - ssh -i ~/OneDrive/Desktop/CS260.pem ubuntu@3.222.238.243
    - ssh -i ~/OneDrive/Desktop/CS260.pem ubuntu@mindwall.click

- Route 53 & Domain Setup
    An IP address works for testing, but a domain name is required for user-friendly navigation and for setting up secure HTTPS connections. Route 53 handles domain registration, DNS hosting, and DNS record management.
    
    - **Domaind Record** Connects "mindwall.click" directly to my server's IP address ("3.222.238.243")

- Caddy
Caddy is a web server that manages incoming web traffic.
    - Automatically changes insecure "http://" traffic to secure "https://". startup.mindwall.click and simon.mindwall.click 
## HTML

It is important to have a clean and organized structure for my HTML code. I have learned the different types of elements and how to use the most common ones, such as heading, images, links, and paragraphs.

- HTML Setup
I learned how to deploy my website using the terminal. I figured out how to navigate folder paths, rund a deployment script, and use my key file to get everything working. 

- Concepts
 - I learned using <nav> to create a navigation bar, <main> to create the main and <aside> to create a sidebar. 
 - Mowing between pages using <a href="page.html">Link</a> to make them click trought to the other pages.
 - Self-closing tags, I used <hr /> to draw a dividing line.

## CSS
I learned how to actually style HTML elements, use different selectors, and apply properties to completely control how my web pages look and feel. I also learned how to drop in CSS frameworks like Bootstrap to speed up my workflow and easily make things responsive without writing everything from scratch.

### MindWall Color Palette
* `#ebf1ff` (Light Blue)
* `#adc6ff` (Accent Blue)
* `#d7c5ff` (Accent Purple)
* `#f1ebff` (Light Purple)
* `#d6e2ff` (Soft Blue)

### What I figured out about Layouts & Styling:
* **Flexbox is a lifesaver:** I learned that by just adding `display: flex`, `justify-content: center`, and `align-items: center` to a container, I can perfectly snap elements (like my login card) right into the dead center of the screen. 
* **Using External Frameworks:** I learned how fast I can apply polished, responsive styling just by linking a framework like Bootstrap in my HTML `<head>`. After that, I can just throw their built-in classes (like `btn btn-primary`) onto my buttons and they instantly look great.
* **Adding Custom Google Fonts:** I figured out the absolute cleanest way to add a custom font is by using the `@import` rule. I just have to remember that it MUST be the very first line of my `style.css` file, without any empty lines or code above it, or the browser just ignores it.
* **CSS Specificity can be tricky:** I learned about the universal selector (`*`). It applies to every single individual element on the page, which means it will actually override inherited styles from my `body` tag! When my custom font wasn't loading, I learned I had to check my `*` block to make sure it wasn't accidentally forcing a default system font instead of my custom one.
## React

## What I Learned:
- **React & Vite**: Learned how to build web apps using React components and Vite instead of plain HTML files.
- **Navigation (Routing)**: Used React Router so users can click between the different pages (Login, Play, Scores, About) smoothly without reloading the browser.
- **Styling**: Fixed how CSS and Bootstrap work together so elements and absolute positions line up correctly on the screen.

