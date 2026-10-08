from PIL import Image
img = Image.open('public/trainer-brochure.jpg')

# Tighter crop for the photo area to completely exclude text on the right
box = (175, 230, 335, 510)
cropped = img.crop(box)
# Optionally resize slightly for 'higher quality' feel (interpolation)
upscaled = cropped.resize((cropped.width * 2, cropped.height * 2), Image.Resampling.LANCZOS)
upscaled.save('public/trainer-cropped.jpg')
