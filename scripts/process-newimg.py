"""Crop, square and downscale the product PNGs in newimg to web-sized WebP files."""
import os
import sys
from concurrent.futures import ProcessPoolExecutor
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
SRC, OUT = sys.argv[1], sys.argv[2]
SIZE = 1000


def process(args):
    index, name = args
    im = Image.open(os.path.join(SRC, name)).convert('RGBA')
    box = im.getchannel('A').point(lambda a: 255 if a > 12 else 0).getbbox()
    if box:
        im = im.crop(box)
    side = int(max(im.size) * 1.08)
    canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    canvas.paste(im, ((side - im.width) // 2, (side - im.height) // 2))
    canvas = canvas.resize((SIZE, SIZE), Image.LANCZOS)
    canvas.save(os.path.join(OUT, f'{index:03d}.webp'), quality=86, method=6)
    return index, name


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    names = sorted(os.listdir(SRC))
    with ProcessPoolExecutor(max_workers=4) as pool:
        for index, name in pool.map(process, enumerate(names)):
            print(f'{index:03d}\t{name}', flush=True)
