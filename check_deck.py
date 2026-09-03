import pptx
import os

files = [
    'Daily_Yoga_Subscription_UX_Strategy_Updated.pptx',
    'Daily_Yoga_Subscription_Legal_Compliance_Deck.pptx'
]

for f in files:
    if os.path.exists(f):
        prs = pptx.Presentation(f)
        print(f"File: {f} | Slides: {len(prs.slides)} | File size: {os.path.getsize(f)} bytes")
    else:
        print(f"File NOT found: {f}")
