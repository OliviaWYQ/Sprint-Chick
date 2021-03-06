//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
import {Resource} from "./Resource.js";

export class ResourceLoader {
    constructor() {
        this.map = new Map(Resource);
        // console.log(this.map);
        for (let [key, value] of this.map) {
            const image = wx.createImage();
            image.src = value;
            this.map.set(key, image);
        }
    }

    onLoaded(callback) {
        let loadedCount = 0;
        for (let val of this.map.values()) {
            val.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map)
                }
            }
        }
    }

    static create() {
        return new ResourceLoader();
    }
}
