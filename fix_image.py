from PIL import Image, ImageDraw, ImageFont

img = Image.open('public/trainer-cropped.jpg')
# The logo provided by the user
logo = Image.open('/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/.user_uploaded/media_1791486655640.png').convert("RGBA")

# 1. Make face narrower by scaling the image horizontally (width * 0.94)
new_width = int(img.width * 0.92)
img = img.resize((new_width, img.height), Image.Resampling.LANCZOS)

# 2. Add the logo to the chest
# The image is roughly 1024x1024, now 942x1024
# The chest text is roughly at x=350, y=550. Let's resize logo and place it.
logo_width = 250
logo_ratio = logo.height / logo.width
logo_height = int(logo_width * logo_ratio)
logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

# Coordinates for logo (approx)
logo_x = int(new_width * 0.35)
logo_y = int(img.height * 0.55)

# 3. Add text to name tag
# The name tag is roughly at x=600, y=500
tag_x = int(new_width * 0.57)
tag_y = int(img.height * 0.51)

# Draw black rectangle over the gibberish text on the chest (just in case logo doesn't cover)
draw = ImageDraw.Draw(img)
draw.rectangle([logo_x - 10, logo_y - 10, logo_x + logo_width + 10, logo_y + logo_height + 10], fill=(13, 14, 16))

# Paste logo
img.paste(logo, (logo_x, logo_y), logo)

# Draw a rectangle over the name tag gibberish and write "Денис"
# Name tag is metallic gray, let's draw a dark gray rectangle over it
tag_rect = [tag_x, tag_y, tag_x + 90, tag_y + 25]
draw.rectangle(tag_rect, fill=(100, 100, 100))

# Try to load a font, or use default
try:
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
except:
    font = ImageFont.load_default()
    
draw.text((tag_x + 10, tag_y + 4), "Денис", fill=(255, 255, 255), font=font)

img.save('public/trainer-cropped.jpg')
