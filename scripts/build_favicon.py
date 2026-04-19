from PIL import Image
from pathlib import Path

SRC = Path(r"C:/Users/kaish/Downloads/IMG_6541.png")
PUB = Path(r"C:/Users/kaish/uranai-daily/public")
APP = Path(r"C:/Users/kaish/uranai-daily/src/app")

img = Image.open(SRC).convert("RGBA")
w, h = img.size
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
img = img.crop((left, top, left + side, top + side))

img.resize((512, 512), Image.LANCZOS).save(PUB / "icon-512x512.png", "PNG")
img.resize((192, 192), Image.LANCZOS).save(PUB / "icon-192x192.png", "PNG")
img.resize((180, 180), Image.LANCZOS).save(PUB / "apple-touch-icon.png", "PNG")

ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
img.save(APP / "favicon.ico", format="ICO", sizes=ico_sizes)

print("done")
