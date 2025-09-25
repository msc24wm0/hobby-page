async function load() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        const infoDiv = document.getElementById('info');
        
        data.forEach((item) => {
            const newDiv = document.createElement("div");
            newDiv.className = "media-item";
            
            // 添加title屬性到媒體項目
            if (item.title) {
                newDiv.setAttribute('title', item.title);
            }
            
            // 創建標題元素
            if (item.title) {
                const titleElement = document.createElement("h3");
                titleElement.className = "item-title";
                titleElement.textContent = item.title;
                titleElement.setAttribute('title', item.title); // 添加title屬性
                newDiv.appendChild(titleElement);
            }
            
            if (item.type === 'jpg' || item.type === 'png' || item.type === 'jpeg') {
                // 圖片項目
                const img = document.createElement("img");
                img.src = item.source;
                img.alt = item.explanation || 'Image';
                img.title = item.title || item.explanation || 'Image'; // 添加title屬性
                img.height = 400;
                
                const explanation = document.createElement("p");
                explanation.className = "explanation";
                explanation.textContent = item.explanation;
                explanation.title = item.explanation; // 添加title屬性
                
                // 下載按鈕
                const downloadBtn = createDownloadButton(
                    item.source, 
                    `download.${item.type}`, 
                    'Download',
                    item.title ? `Download: ${item.title}` : 'Download'
                );
                
                newDiv.appendChild(img);
                newDiv.appendChild(explanation);
                newDiv.appendChild(downloadBtn);
                
            } else if (item.type === 'mp4' || item.type === 'webm') {
                // 視頻項目
                const video = document.createElement("video");
                video.height = 400;
                video.controls = true;
                video.title = item.title || item.explanation || 'Video'; // 添加title屬性
                
                const source = document.createElement("source");
                source.src = item.source;
                source.type = `video/${item.type}`;
                
                const explanation = document.createElement("p");
                explanation.className = "explanation";
                explanation.textContent = item.explanation;
                explanation.title = item.explanation; // 添加title屬性
                
                // 下載按鈕
                const downloadBtn = createDownloadButton(
                    item.source, 
                    `download.${item.type}`, 
                    'Download',
                    item.title ? `Download: ${item.title}` : 'Download'
                );
                
                video.appendChild(source);
                newDiv.appendChild(video);
                newDiv.appendChild(explanation);
                newDiv.appendChild(downloadBtn);
                
            } else if (item.type === 'text') {
                // 文本項目
                const text = document.createElement("p");
                text.className = "explanation";
                text.textContent = item.text;
                text.title = item.text; // 添加title屬性
                
                // 文本項目也可以有下載按鈕（下載為txt文件）
                if (item.source) {
                    const downloadBtn = createDownloadButton(
                        item.source, 
                        'download.txt', 
                        'Download',
                        item.title ? `Download: ${item.title}` : 'Download'
                    );
                    newDiv.appendChild(text);
                    newDiv.appendChild(downloadBtn);
                } else {
                    // 如果沒有源文件，只顯示文本
                    newDiv.appendChild(text);
                }
            } else {
                console.warn("Unsupported file type:", item.type);
                return;
            }
            
            infoDiv.appendChild(newDiv);
        });
        
    } catch (error) {
        console.error('Error while loading data:', error);
        const infoDiv = document.getElementById('info');
        infoDiv.innerHTML = '<p style="color: red;">Error while loading data. Please contact the file owner.</p>';
    }
}

// 創建下載按鈕的函數（更新版，包含title屬性）
function createDownloadButton(fileUrl, fileName, buttonText = '下載', titleText = '') {
    const downloadContainer = document.createElement("div");
    downloadContainer.className = "download-container";
    
    const downloadBtn = document.createElement("a");
    downloadBtn.href = fileUrl;
    downloadBtn.download = fileName;
    downloadBtn.className = "download-btn";
    downloadBtn.textContent = buttonText;
    
    // 設置title屬性
    if (titleText) {
        downloadBtn.title = titleText;
    } else {
        downloadBtn.title = `下載文件: ${fileName}`;
    }
    
    // 添加點擊事件
    downloadBtn.addEventListener('click', function() {
        console.log(`下載文件: ${fileName}, 標題: ${titleText}`);
    });
    
    downloadContainer.appendChild(downloadBtn);
    return downloadContainer;
}

window.addEventListener('DOMContentLoaded', load);