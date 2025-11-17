import base64

def to_base64(file_path, mime_type):
    with open(file_path, "rb") as f:
        data = base64.b64encode(f.read()).decode('utf-8')
    return f"data:{mime_type};base64,{data}"

img_data1 = to_base64("vintage_paper.jpeg", "image/png")
img_data2 = to_base64("photo2.png", "image/png")
img_data3 = to_base64("photo3.png", "image/png")
img_data4 = to_base64("photo4.png", "image/png")
img_data5 = to_base64("photo5.png", "image/png")
audio_data = to_base64("lagu.mp3", "audio/mpeg")

html = f"""
            background: url('{img_data1}') center/cover;
                <div class="photo-album">
                    <div class="photo" style="background-image: url('{img_data1}');"></div>
                    <div class="photo" style="background-image: url('{img_data2}');"></div>
                    <div class="photo" style="background-image: url('{img_data3}');"></div>
                    <div class="photo" style="background-image: url('{img_data4}');"></div>
                    <div class="photo" style="background-image: url('{img_data5}');"></div>
                </div>

        const musicDataUrl = "{audio_data}";                
"""

with open("output.html", "w") as f:
    f.write(html)