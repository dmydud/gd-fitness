from PIL import Image, ImageDraw, ImageFilter
import sys

# Load AI generated image
img_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/trainer_perfect_1791486763791.jpg'
img = Image.open(img_path).convert('RGBA')
print(f"Img size: {img.size}")

# Load the real logo
logo_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/.user_uploaded/media_1791486655640.png'
logo = Image.open(logo_path).convert('RGBA')

# The AI image is 1024x1024. The logo is roughly around x=410, y=510.
# We will create a black patch with feathered edges to hide the AI logo
patch = Image.new('RGBA', img.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(patch)
# Estimate AI logo bounding box (need to be careful not to cover the name tag)
# The AI logo "Інтер АТЛЕТИКА" spans roughly x=410 to 600, y=500 to 540.
draw.ellipse((400, 500, 620, 550), fill=(10, 10, 10, 255)) # Dark gray/black matching shirt

# Blur the patch so it blends into the shirt seamlessly
patch = patch.filter(ImageFilter.GaussianBlur(10))

# Composite patch over image
img = Image.alpha_composite(img, patch)

# Now resize and paste the real logo
logo_width = 200
logo_ratio = logo.height / logo.width
logo_height = int(logo_width * logo_ratio)
logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

# Make logo slightly transparent so it looks printed (90% opacity)
logo.putalpha(logo.getchannel('A').point(lambda i: int(i * 0.85)))

# Paste real logo
# We might need to rotate it slightly to match chest angle
logo = logo.rotate(-1, expand=True, resample=Image.Resampling.BICUBIC)
img.paste(logo, (420, 510), logo)

img.convert('RGB').save('public/trainer-cropped.jpg')
