from PIL import Image
img = Image.open('public/trainer-brochure.jpg')

# Tighter crop for the photo area
# Just the photo, ignoring text on the right
box = (175, 230, 415, 510)
cropped = img.crop(box)
cropped.save('public/trainer-cropped.jpg')
