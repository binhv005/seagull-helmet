"""Copy processed WebP files (.work/proc/NNN.webp) to public/images/products/<product>/<color>.webp."""
import os
import shutil
import sys

PLAN = {
    'astro': ['white', 'matte-black'],
    'tesla': ['white', 'red-black', 'matte-black-pink', 'matte-black-yellow', 'black'],
    'tw-107': ['italia', 'matte-pastel-blue'],
    'tw-500tx-fc-mexican-butcher': ['matte-iron'],
    'tw-500tx-fc': ['midnight-blue', 'ivory', 'matte-silver', 'pink', 'matte-black'],
    'tw-500tx-f': ['red', 'green', 'gold', 'matte-black', 'black'],
    'tw-777p': ['ivory', 'black', 'iron-grey', 'matte-black'],
    'tw-780-cartoon': ['milk-tea-cat', 'white-bear', 'lavender-bear', 'white-dino', 'pink-bear', 'baby-blue-dino',
                       'baby-blue-cat', 'red-cat', 'matte-cement-bear', 'yellow-dino', 'black-dino', 'black-bear'],
    'tw-780': ['cream', 'white', 'red-bean', 'matte-black', 'black'],
    'tw-781l': ['deep-silver-blue', 'black'],
    'tw-781m#a': ['matte-rose', 'matte-army-green'],
    'tw-781m-leather': ['milk-tea', 'midnight-blue', 'ivory-black', 'matte-black', 'matte-black-black'],
    'tw-781-italia#a': ['black'],
    'tw-781m-cartoon': ['milk-tea-cat', 'midnight-bear', 'white-bear', 'red-cat', 'yellow-dino'],
    'tw-781m#b': ['light-cement', 'macchiato', 'rose', 'ivory', 'army-green'],
    'tw-781m-glitter': ['light-blue', 'black'],
    'tw-781-stripe': ['blue-white', 'silver-black', 'matte-black', 'yellow-white', 'black-white'],
    'tw-781-italia#b': ['bright-grey'],
    'tw-781m#c': ['light-sand'],
    'tw-786-city#a': ['cocoa-red', 'macchiato', 'turquoise', 'basil-green', 'silver'],
    'tw-786-artisan#a': ['midnight-blue', 'silver', 'black'],
    'tw-786-artisan-stripe': ['cocoa-red', 'lapis', 'milk-tea', 'macchiato', 'white', 'matte-grey', 'black'],
    'tw-786-city#b': ['matte-cocoa-red', 'matte-earth-yellow', 'matte-sand', 'matte-basil-green', 'matte-black'],
    'tw-786-flying-tigers': ['cream', 'olive', 'silver', 'sky-guardians'],
    'tw-863': ['milk-tea', 'light-cement', 'light-cement-stripe', 'ivory', 'silver-stripe', 'silver',
               'matte-iron-stripe', 'matte-black-white-stripe', 'matte-black-stripe'],
    'tw-980': ['flame-midnight-blue', 'white', 'silver-flame-grey', 'silver-flame-black', 'matte-black', 'black'],
    'tw-786-artisan#b': ['ultimate-matte-black'],
    'tw-786-wind-rider': ['magenta', 'basil-green', 'mustard', 'vanilla'],
}

src, out = sys.argv[1], sys.argv[2]
index = 0
for key, colors in PLAN.items():  # order matches the sorted source file names
    product = key.split('#')[0]
    os.makedirs(os.path.join(out, product), exist_ok=True)
    for color in colors:
        shutil.copy(os.path.join(src, f'{index:03d}.webp'), os.path.join(out, product, f'{color}.webp'))
        index += 1
print(index, 'images placed')
