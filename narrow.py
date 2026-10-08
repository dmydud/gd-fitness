from PIL import Image

img = Image.open('public/trainer-vintage.png')
new_width = int(img.width * 0.94)
img_narrowed = img.resize((new_width, img.height), Image.Resampling.LANCZOS)
img_narrowed.save('public/trainer-vintage.png')
