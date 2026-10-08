from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# 1. Load original brochure photo
img = Image.open('public/trainer-brochure.jpg')

# 2. Crop tightly to remove text on right
box = (175, 230, 335, 510)
img = img.crop(box)

# 3. Upscale (2.5x) using Lanczos for smoothness
img = img.resize((int(img.width * 2.5), int(img.height * 2.5)), Image.Resampling.LANCZOS)

# 4. Sharpen to increase perceived quality (Unsharp Mask)
img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))

# 5. Enhance Contrast and Color
enhancer = ImageEnhance.Contrast(img)
img = enhancer.enhance(1.15)
color_enhancer = ImageEnhance.Color(img)
img = color_enhancer.enhance(1.1)

# 6. Make face narrower (scale width to 92%)
new_width = int(img.width * 0.92)
img = img.resize((new_width, img.height), Image.Resampling.LANCZOS)

img = img.convert('RGBA')

# 7. Overlay real logo to hide the blurry printed logo
logo_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/.user_uploaded/media_1791486655640.png'
logo = Image.open(logo_path).convert('RGBA')

logo_width = int(new_width * 0.35)
logo_ratio = logo.height / logo.width
logo_height = int(logo_width * logo_ratio)
logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

# Make logo slightly faded to look like fabric print
logo.putalpha(logo.getchannel('A').point(lambda i: int(i * 0.85)))

# Position logo (approximate based on the new dimensions)
# Crop width was 160 -> upscaled to 400 -> narrowed to 368
# Crop height was 280 -> upscaled to 700
logo_x = int(new_width * 0.45)
logo_y = int(img.height * 0.38)

# Draw a dark patch to cover the old blurry text
patch = Image.new('RGBA', img.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(patch)
draw.ellipse((logo_x - 10, logo_y - 10, logo_x + logo_width + 10, logo_y + logo_height + 10), fill=(20, 20, 20, 255))
patch = patch.filter(ImageFilter.GaussianBlur(5))
img = Image.alpha_composite(img, patch)

# Paste logo
img.paste(logo, (logo_x, logo_y), logo)

# 8. Draw clear name tag
tag_x = int(new_width * 0.70)
tag_y = int(img.height * 0.33)

draw_img = ImageDraw.Draw(img)
# Draw dark metal tag over blurry tag
draw_img.rectangle([tag_x, tag_y, tag_x + 50, tag_y + 15], fill=(70, 70, 75))

try:
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 10)
except:
    font = ImageFont.load_default()
    
draw_img.text((tag_x + 6, tag_y + 2), "Денис", fill=(255, 255, 255), font=font)

# Save
img.convert('RGB').save('public/trainer-cropped.jpg')
