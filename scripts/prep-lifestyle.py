"""Build the lifestyle / lookbook photos and accessory cut-outs from image/AnhSanPham.

The original campaign banners carry Chinese copy, so the text areas are cropped away.
Usage: python scripts/prep-lifestyle.py image/AnhSanPham public/images
"""
import os
import sys
from PIL import Image, ImageDraw

src, out = sys.argv[1], sys.argv[2]
files = sorted(os.listdir(src))
os.makedirs(os.path.join(out, 'lifestyle'), exist_ok=True)
os.makedirs(os.path.join(out, 'products', 'accessories'), exist_ok=True)


def open_src(index):
    return Image.open(os.path.join(src, files[index])).convert('RGB')


def save(im, name):
    im.save(os.path.join(out, 'lifestyle', name), quality=86, optimize=True, progressive=True)


# wide campaign photos
save(open_src(25).crop((470, 0, 1920, 1000)), 'flying-tigers-wide.jpg')  # caption sits at x < 420
save(open_src(28).crop((840, 0, 1920, 1000)), 'mexican-butcher-wide.jpg')  # caption spans x 190-820
save(open_src(33).crop((700, 0, 1921, 700)), 'workshop-wide.jpg')  # caption spans x 230-650
save(open_src(36).crop((0, 0, 1020, 700)), 'ride-your-style.jpg')
save(open_src(26).crop((0, 215, 961, 750)), 'flying-tigers-table.jpg')

# small mood shots: crop away the caption in the bottom-left corner
for index, name in [(29, 'mood-three-quarter'), (30, 'mood-full-face'), (31, 'mood-open-face'), (32, 'mood-large-size')]:
    save(open_src(index).crop((200, 0, 451, 350)), f'{name}.jpg')


# accessories: white studio background -> transparent cut-out
def cut_out(index, name, extra_seeds=()):
    im = open_src(index).convert('RGBA')
    seeds = [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1), *extra_seeds]
    for seed in seeds:
        ImageDraw.floodfill(im, seed, (255, 255, 255, 0), thresh=18)
    box = im.getchannel('A').getbbox()
    im = im.crop(box)
    side = int(max(im.size) * 1.15)
    canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    canvas.paste(im, ((side - im.width) // 2, (side - im.height) // 2))
    canvas.resize((800, 800), Image.LANCZOS).save(os.path.join(out, 'products', 'accessories', name), quality=88)


cut_out(34, 'bubble-visor.webp')
cut_out(37, 'helmet-stand.webp', extra_seeds=[(240, 240)])  # hole in the middle of the ring
print('done')
