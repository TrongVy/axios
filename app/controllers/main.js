var sanPhamServer =new SanPhamServer();
function getElm(id){
    return document.getElementById(id);
}   

var layDanhSachSP = function(){
        sanPhamServer.layDSSP().then(function(result){
            // neu thanh cong
            console.log(result.data);
            renderTable(result.data);
        }).catch(function(error){
            //neu thach bai
            console.log(error);
        })
}
layDanhSachSP();
function renderTable(arrProducts){
        var content = '';
         arrProducts.map(function(sp,index){
            content += `
                    <tr>
                        <td>${index +1}</td>
                        <td>${sp.tenSP}</td>
                        <td>${sp.gia}</td>
                        <td>
                            <img style="height:50px" src="${sp.hinhAnh}">
                        </td>
                        <td>${sp.moTa}</td>
                        <td>
                            <button class="btn btn-danger">Xoa</button>
                            <button class="btn btn-success">Xem</button>
                        </td>
                    </tr>
            `;
        })
        getElm('tblDanhSachSP').innerHTML = content;
}