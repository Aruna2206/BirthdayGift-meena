import os
import glob

paths = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True)
count = 0

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # Replace background gradients
    new_content = new_content.replace('from-[#44ACFF] via-[#44ACFF]/50 to-white', 'from-pink-400 via-rose-400 to-red-400')
    new_content = new_content.replace('from-[#44ACFF] to-white', 'from-pink-500 to-rose-500')
    new_content = new_content.replace('via-[#44ACFF]/50', 'via-rose-500')
    
    # Replace text colors
    new_content = new_content.replace('text-[#44ACFF]', 'text-pink-500')
    
    # Replace borders
    new_content = new_content.replace('border-[#44ACFF]/20', 'border-pink-200')
    new_content = new_content.replace('border-[#44ACFF]', 'border-pink-500')
    
    # Replace backgrounds
    new_content = new_content.replace('bg-[#44ACFF]/5/50', 'bg-pink-50/50')
    new_content = new_content.replace('bg-[#44ACFF]/10', 'bg-pink-100')
    new_content = new_content.replace('bg-[#44ACFF]', 'bg-pink-500')
    
    # Finally catch any remaining #44ACFF
    new_content = new_content.replace('[#44ACFF]', 'pink-500')
    
    # And revert my previous white replacements if needed (only in specific tailwind classes)
    new_content = new_content.replace('via-white/30', 'via-white/30') # Leave as is
    
    # Fix the heart icons that were changed to white in my previous script?
    # the user wanted the pink theme, let's keep it simple.

    if new_content != content:
        with open(p, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f'Updated {p}')

print(f'Total {count} files updated.')
