export class gameApi{
    getUserInfo(){
        const params = {
            success: function (res) {
                console.log(res)
            }
        };
        wx.getUserInfo(params);
    }

    login(){
        wx.login({
            success: function (res) {
                console.log(res)
            }
        });
    }
}
