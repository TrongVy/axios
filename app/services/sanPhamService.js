function SanPhamServer() {
    this.layDSSP = function () {
        // axios tra ve promiss
        return axios({
            url: 'https://60d976bfeec56d00174777e2.mockapi.io/products',
            method: 'GET' //get la phuong thuc lay du lieu tu server
        });

    }
}
