from PIL import Image, ImageFilter

img_path = 'public/trainer-vintage.png'
img = Image.open(img_path)

# The image has black borders (it's a photo of a print) and is slightly rotated.
# Let's rotate it to straighten the print edges.
angle = -2.5
img_rotated = img.rotate(angle, resample=Image.Resampling.BICUBIC, expand=False)

w, h = img_rotated.size

# The borders are roughly:
# Left: 6% (black plastic sleeve)
# Right: 5% (black border)
# Top: 4% (black border)
# Bottom: 4% (black border)
left = int(w * 0.08)
top = int(h * 0.04)
right = int(w * 0.94)
bottom = int(h * 0.95)

img_cropped = img_rotated.crop((left, top, right, bottom))

# Save over the same file
img_cropped.save('public/trainer-vintage.png')
