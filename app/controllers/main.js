var sanPhamServer =new SanPhamServer();
function getElm(id){
    return document.getElementById(id);
}   

var layDanhSachSP = function(){
        sanPhamServer.layDSSP().then(function(result){
            // neu thanh cong
            console.log(result.data);
            renderTable(result.data);
            setLocal(result.data)
        }).catch(function(error){
            //neu thach bai
            console.log(error);
        })
}
layDanhSachSP();
var themSanPham = function(){
  
    //lay thong tin tu form
    //id tu tang
    var tenSP = getElm('TenSP').value;
    var gia = getElm('GiaSP').value;
    var hinhAnh = getElm('HinhSP').value;
    var moTa = getElm('moTa').value;
    // khoi tao doi tuong san pham tu lop doi tuong san pham tu
    var sp = new SanPham(tenSP,gia,hinhAnh,moTa);
    console.log(sp)
    //goi api de luu data xuong CSDL(database)
    sanPhamServer.themSP(sp).then(function(result){
        // them sp thanh cong va load lai api
       layDanhSachSP();
          
    }).catch(function(err){
        console.log(err)
    })
}
//them button vao form
getElm('btnThemSP').addEventListener('click', function() {
         //   clear data tren form 
         getElm('form').reset();
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class="btn btn-success" onclick="themSanPham()">Them San Pham</button>`;
  
})
//xoa sp 
function xoaSanPham(id){
        sanPhamServer.xoaSP(id).then(function(result){
            //load lai danh sach san pham sau khi xoa thanh cong
            alert('success');
            layDanhSachSP();
        }).catch(function(error){
            console.log(error)
        })
}
//cap nhat san pham
function capNhatSanPham(id){
    var tenSP = getElm('TenSP').value;
    var gia = getElm('GiaSP').value;
    var hinhAnh = getElm('HinhSP').value;
    var moTa = getElm('moTa').value;
    // khoi tao doi tuong san pham tu lop doi tuong san pham tu
    var sp = new SanPham(tenSP,gia,hinhAnh,moTa);
    console.log(sp);
    //cap nhat thong tin xuong database 
    sanPhamServer.capNhatSP(id,sp).then(function(result){
            console.log(result.data);
            //khi sua sp thanh cong thi load lai danh sach san pham
            layDanhSachSP();
            //an modal sau khi cap nhat thanh cong
            document.querySelector('#myModal .close').click();
            // id la myModal class: close.
      
    }).catch(function(error){
        // alert(error)
        console.log(error)
    })
}
//add sp
function xemSP(id){
       sanPhamServer.xemSP(id).then(function(result){
                console.log(result.data);
                // hien thi modal
                // $('#myModal').modal('show');
                var sp = result.data;
                getElm('btnThemSP').click();
               getElm('TenSP').value = sp.tenSP;
              getElm('GiaSP').value = sp.gia;
                getElm('HinhSP').value = sp.hinhAnh;
               getElm('moTa').value = sp.moTa;
               // add button cap nhat cho form
               var modalFooter = document.querySelector('.modal-footer');
               modalFooter.innerHTML =`<button class="btn btn-success" onclick="capNhatSanPham('${sp.id}')" >cap nhat</button>`
       }).catch(function(error){
           alert(error);
       })
}
var renderTable =function (arrProducts){
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
                            <button class="btn btn-danger" onclick=" xoaSanPham('${sp.id}')">Xoa</button>
                            <button class="btn btn-success" onclick="xemSP('${sp.id}')">Xem</button>
                        </td>
                    </tr>
            `;
        })
        getElm('tblDanhSachSP').innerHTML = content;
}
getElm('ipTimKiem').addEventListener('keyup', function () {
    var mangSP = getLocal();
    var chuoiTK = getElm('ipTimKiem').value;
  
    var mangTimKiem = sanPhamServer.timKiemSP(mangSP, chuoiTK);
    renderTable(mangTimKiem);
  });
function setLocal(dssp){
    localStorage.setItem('DSSP',JSON.stringify(dssp));
}
function getLocal(){
    if(localStorage.getItem('DSSP'))
        { 
       return JSON.parse(localStorage.getItem('DSSP'));
    }
}