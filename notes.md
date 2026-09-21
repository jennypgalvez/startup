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
## React

Interesting things I have learned about React

