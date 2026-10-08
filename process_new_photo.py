from PIL import Image, ImageFilter, ImageEnhance

# 1. Load image
img_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/.user_uploaded/media_1791487033159.png'
img = Image.open(img_path)

# 2. Rotate to straighten
# The image is tilted to the left slightly (the vertical white bar on the right is tilting left at the top).
# Wait, looking at the image, the vertical white bar in the background leans left at the top. 
# Let's rotate clockwise. Let's try -1.5 degrees. (Or is it leaning right?)
# Let's just do a 1 degree rotation clockwise (-1)
angle = -1.5
img_rotated = img.rotate(angle, resample=Image.Resampling.BICUBIC, expand=False)

# 3. Crop to remove borders from rotation and the edge of the physical photo
w, h = img_rotated.size
# Looking at the photo, there is a lot of space on the left (the plastic sleeve), let's crop it out.
# Let's crop x from 10% to 90%, y from 5% to 95%
box = (int(w * 0.1), int(h * 0.05), int(w * 0.95), int(h * 0.95))
img_cropped = img_rotated.crop(box)

# 4. Upscale (2x) to increase perceived resolution
new_w = int(img_cropped.width * 2)
new_h = int(img_cropped.height * 2)
img_upscaled = img_cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)

# 5. Increase quality: Contrast and Color
enhancer = ImageEnhance.Contrast(img_upscaled)
img_enhanced = enhancer.enhance(1.2) # Boost contrast

color_enhancer = ImageEnhance.Color(img_enhanced)
img_enhanced = color_enhancer.enhance(1.15) # Boost saturation

# 6. Sharpen (Unsharp mask)
img_final = img_enhanced.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))

# Save
img_final.convert('RGB').save('public/trainer-cropped.jpg')
