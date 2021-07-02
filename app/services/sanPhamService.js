function SanPhamServer() {
    this.layDSSP = function () {
        // axios tra ve promiss
        return axios({
            url: 'https://60d976bfeec56d00174777e2.mockapi.io/products',
            method: 'GET' //get la phuong thuc lay du lieu tu server
        });

    }
    this.themSP = function(sp){
        //method post dung de them moi du lieu
        // data la du lieu can them vao co so du lieu phia sever
            return axios({
                url: 'https://60d976bfeec56d00174777e2.mockapi.io/products',
                method : 'POST',
                data : sp,
            })
    }
    this.xoaSP = function(id){
        //delete data : thong qua id.
        return axios({
            url :`https://60d976bfeec56d00174777e2.mockapi.io/products/${id}`,
            method : 'DELETE'
        })
    }
    this.xemSP = function(id){
        //GET: lay data sp dua vao id
        return axios({
            url :`https://60d976bfeec56d00174777e2.mockapi.io/products/${id}`,
            method: "GET"
        })
    }
    this.capNhatSP = function(id,sp){
        return axios({
            url :`https://60d976bfeec56d00174777e2.mockapi.io/products/${id}`,
            method : 'PUT',
            data : sp
        })
    }
    this.timKiemSP = function(dssp,chuoiTK){
            return dssp.filter(function(sp){
                return sp.tenSP.toLowerCase().indexOf(chuoiTK.toLowerCase() ) !== -1;
            })
    }
}
