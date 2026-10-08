from PIL import Image
img = Image.open('public/trainer-brochure.jpg')
# Crop box: (left, upper, right, lower)
# Based on 768x1024, the photo is approximately at x: 120-400, y: 150-500
box = (120, 180, 420, 520)
cropped = img.crop(box)
cropped.save('public/trainer-crossed.jpg')
