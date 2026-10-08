from PIL import Image, ImageDraw, ImageFilter

# 1. Load the AI perfect image
img_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/trainer_perfect_1791486763791.jpg'
img = Image.open(img_path).convert('RGBA')

# 2. Load the real logo (transparent PNG)
logo_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/.user_uploaded/media_1791486655640.png'
logo = Image.open(logo_path).convert('RGBA')

# 3. Create a dark patch to cover the AI's bad logo
# The AI logo is around x=410, y=510, width=200, height=40
patch = Image.new('RGBA', img.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(patch)
draw.ellipse((390, 500, 610, 550), fill=(10, 10, 10, 255)) 
patch = patch.filter(ImageFilter.GaussianBlur(8))
img = Image.alpha_composite(img, patch)

# 4. Resize and prepare the real logo
logo_width = 190
logo_ratio = logo.height / logo.width
logo_height = int(logo_width * logo_ratio)
logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

# 5. Rotate slightly to match chest angle
logo = logo.rotate(-2, expand=True, resample=Image.Resampling.BICUBIC)

# 6. Adjust opacity so it looks like printed fabric
logo.putalpha(logo.getchannel('A').point(lambda i: int(i * 0.90)))

# 7. Paste logo
img.paste(logo, (405, 510), logo)

# 8. Save
img.convert('RGB').save('public/trainer-cropped.jpg')
