import os
import glob

paths = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True)
count = 0

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the color hex code and also the tailwind class variations
    new_content = content.replace('[#FE9EC7]', 'white').replace('#FE9EC7', 'white')
    
    if new_content != content:
        with open(p, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f'Updated {p}')

print(f'Total {count} files updated.')
