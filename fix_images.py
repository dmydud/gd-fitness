import os

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace src="/img" with src={`${import.meta.env.BASE_URL}img`}
    content = content.replace('src="/profile.png"', 'src={`${import.meta.env.BASE_URL}profile.png`}')
    content = content.replace('src="/trainer-vintage.png"', 'src={`${import.meta.env.BASE_URL}trainer-vintage.png`}')
    content = content.replace('src="/trainer-cutout.png"', 'src={`${import.meta.env.BASE_URL}trainer-cutout.png`}')
    content = content.replace('e.currentTarget.src = "/trainer-hero.jpg";', 'e.currentTarget.src = `${import.meta.env.BASE_URL}trainer-hero.jpg`;')

    with open(filepath, 'w') as f:
        f.write(content)

fix_file('src/components/Navbar.tsx')
fix_file('src/components/BioSection.tsx')
fix_file('src/components/Hero.tsx')
