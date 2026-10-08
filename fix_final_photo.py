from PIL import Image, ImageDraw, ImageFilter

img_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/.user_uploaded/media_1791488774097.jpg'
img = Image.open(img_path).convert('RGBA')

# 1. Narrow the face (and body) by 6% horizontally
new_width = int(img.width * 0.94)
img = img.resize((new_width, img.height), Image.Resampling.LANCZOS)

# 2. Fix the logo
logo_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/.user_uploaded/media_1791486655640.png'
logo = Image.open(logo_path).convert('RGBA')

# Patch over AI text
patch = Image.new('RGBA', img.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(patch)

# The AI text is around x=280 to 450, y=480 to 520
# Let's cover a slightly larger area to be safe
draw.ellipse((270, 470, 480, 520), fill=(15, 15, 15, 255))
patch = patch.filter(ImageFilter.GaussianBlur(8))
img = Image.alpha_composite(img, patch)

# Prepare real logo
logo_width = 170
logo_ratio = logo.height / logo.width
logo_height = int(logo_width * logo_ratio)
logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

logo = logo.rotate(-2, expand=True, resample=Image.Resampling.BICUBIC)
logo.putalpha(logo.getchannel('A').point(lambda i: int(i * 0.85)))

# Paste real logo
img.paste(logo, (290, 475), logo)

# Save
img.convert('RGB').save('public/trainer-cropped.jpg')
