import sys
import cv2
import pytesseract
import json

image_path = sys.argv[1]

img = cv2.imread(image_path)

# OCR
text = pytesseract.image_to_string(img)

# Simple object detection placeholder
tags = []
if img is not None:
    tags.append("image")

# Face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces_detected = face_cascade.detectMultiScale(gray, 1.3, 5)

faces = []
if len(faces_detected) > 0:
    faces.append("person")

result = {
    "text": text,
    "tags": tags,
    "faces": faces
}

print(json.dumps(result))