from PIL import Image, ImageDraw, ImageFilter

# 1. Load the new AI perfect face image
img_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/trainer_face_fix_1791489036037.jpg'
img = Image.open(img_path).convert('RGBA')

# 2. Load the real logo (transparent PNG)
logo_path = '/Users/dmytro/.gemini/antigravity-ide/brain/05488190-3891-4dbd-9e77-0eeffbd288cf/.user_uploaded/media_1791486655640.png'
logo = Image.open(logo_path).convert('RGBA')

# 3. Create a dark patch to cover the AI's golden logo
# The AI golden logo is roughly around x=520, y=500
patch = Image.new('RGBA', img.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(patch)
draw.ellipse((480, 470, 680, 550), fill=(15, 15, 15, 255)) 
patch = patch.filter(ImageFilter.GaussianBlur(12))
img = Image.alpha_composite(img, patch)

# 4. Resize and prepare the real logo
logo_width = 230
logo_ratio = logo.height / logo.width
logo_height = int(logo_width * logo_ratio)
logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

# 5. Rotate slightly to match chest angle
logo = logo.rotate(-2, expand=True, resample=Image.Resampling.BICUBIC)

# 6. Adjust opacity so it looks like printed fabric
logo.putalpha(logo.getchannel('A').point(lambda i: int(i * 0.90)))

# 7. Paste logo
img.paste(logo, (480, 480), logo)

# 8. Add "Денис" to name tag
tag_x = 550
tag_y = 445

draw_img = ImageDraw.Draw(img)
draw_img.rectangle([tag_x, tag_y, tag_x + 50, tag_y + 15], fill=(70, 70, 75))

try:
    from PIL import ImageFont
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 12)
except:
    font = ImageFont.load_default()
    
draw_img.text((tag_x + 6, tag_y + 2), "Денис", fill=(255, 255, 255), font=font)


# 9. Save
img.convert('RGB').save('public/trainer-cropped.jpg')
