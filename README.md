react和draft-js实现富文本编辑及文档管理
===

### 页面
```
├── exploration
└── dashboard           //倒序展示所有文档，点击可查看内容
    ├── Document        //点击该页面可新建文档，实为editor
    ├── Repository      //展示所有的仓库及各个仓库的文档
    ├── Groups          //以下页面仅为展示用
    ├── Collabrations   
    ├── Topics        
    ├── Following  
    ├── Collections  
    ├── Recent Reads  
    └── Trash bin  
```

### 启动

```
npm start src/index.js
```



### 功能

##### 富文本编辑  
1. 富文本编辑

   可新建文档进行富文本编辑，并选择仓库进行分类保存。文本保存后写入localStorage，dashboard页面按创建时间倒序展示所有文档。

   <img src="./src/img/超链接.png" alt="超链接" style="zoom:25%;" />点击该按钮可以添加超链接

   <img src="./src/img/图片.png" style="zoom:25%;" />点击该按钮可以添加网络图片、视频和音频，只支持url。支持的多媒体格式有jpg、jpeg、png、svg、gif（以上大小写均可），mp4、mkv、rmvb、mov、asf、avi，wav、flac（大小写均可）、MP3（大小写均可）、wma（大小写均可）

   

2. 未保存文档恢复。

   进入document页面即出现是否恢复未保存数据的确认通知，若关闭该通知则该数据将被丢失。

3. 已保存文档重新编辑

   重新编辑可以选择新的仓库和标题。

   图片只能作为块元素，不能在图片的同一行添加内容，否则将报错。

##### 文档管理  
1. 仓库管理，可增加新的仓库
2. 可查看某仓库下的所有文档
