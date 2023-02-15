# Use Nginx image as the base image
FROM nginx

# Copy the web application files to the appropriate directory in the image
COPY /var/www/html/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80