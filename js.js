var myApp = angular.module('myApp', ['ngRoute']);


let xeApi = "https://643eafd46c30feced8304742.mockapi.io/skatwoh/info";

myApp.controller("myCtrl", function ($scope, $http) {
    $scope.hienThiXe = [];

    $http.get(xeApi)
        .then(function (data) {
            $scope.hienThiXe = data.data;
        })
        .catch(function (e) {
            console.log(e);
        });

    $scope.delete = function (index) {
        // Lấy ra id của đối tượng = index truyền vào từ html
        var xe = $scope.hienThiXe[index].id;
        // urlApi/id: để xóa đối tượng = id
        $http.delete(xeApi + "/" + xe)
            .then(function () {
                $scope.hienThiXe.splice(index, 1);
                // C2: gọi lại phương thức lấy danh sách sản phẩm
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    $scope.viTriHienTai = -1;
    $scope.xe = {
        ho_ten: "",
        dia_chi: "",
        dien_thoai: ""
    }

    $scope.onSubmit = function (event) {
        // Phân biệt nút sửa và thêm
        if ($scope.viTriHienTai == -1) {
            // Nút thêm
            console.log($scope.xe);
            $http.post(xeApi, $scope.xe)
                .then(function () {
                    $scope.hienThiXe.push($scope.xe)
                    alert("Cảm ơn bạn đã điền thông tin")
                    window.location = "https://www.facebook.com/";
                })
                .catch(function (e) {
                    console.log(e);
                })
        }

    }
})

const header = document.querySelector(".header");
const headerTop = header.getBoundingClientRect().top;

document.body.style.setProperty("--_header-h", `${header.offsetHeight}px`);

window.addEventListener("scroll", function () {
  header.classList.toggle(
  "is-sticky",
  window.scrollY > headerTop + header.offsetHeight);

});
