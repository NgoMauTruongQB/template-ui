/* Nhận vào một chuổi, sử dụng distructuring
*  - sau khi sử dụng destructuring [first,...strings], 
*  - lấy ra được chuỗi đầu tiên là first và phần còn lại của strings
*  - tất cả nhưng biến nội suy sẽ được lưu vào values 
*  - sử dụng phương thức reduce lặp qua tất cả các phần tử trong mảng 
*  -  nối mảng bắng concat "Ở đây chúng ta gọi một callback ở reduce, 
*  nên ở đây trở thành một hàm nội suy => tách ra phần tử đầu tiên là acc 
*  và trả về phần còn lạ cur, tiếp đến gọi concat để nối acc với với cur lại với nhau"
*  - strings.shift() sẽ trả về phần tử đầu tiên của mảng strings và xoá nó
*  ra khỏi mảng đó. ==>  sau phần này chúng ta sẽ thu được các phần tử dưới dạng mảng 
*  - .join('') sẽ ghép các thành phần của mảng thành string
*  - Dùng filter để trả về x thoả mãn điều kiện nhưng phải khác với true, lấy cả số 0 
*/

export default function html([first,...strings],...values){ 
    return values.reduce( 
        (acc, cur) => acc.concat(cur, strings.shift()), 
        [first]
    ) 
    .filter(x => x && x !== true || x === 0) 
    .join('')
}

/* Hàm này dùng để tạo ra một Store -> Lấy giá trị của reducer
* - Truyền vào một callback reducer
* - Lưu toàn bộ dữu liệu có được từ reducer() vào state -> Đây cũng là
* toàn bộ dữu liệu ban đầu của store.
*/
    
export function createStore (reducer){ 
    let state = reducer(); 
    const roots = new Map(); // để lặp qua tất cả các phàn tử

    // Lặp qua các root để render ra view
    // component() ở đây là một hàm return ra chuỗi html
    // root.innerHTML = output; => đẩy html vào root => đẩy được view ra màn hình
    function render(){
        for(const [root, component] of roots){
            const output = component()
            root.innerHTML = output;
        }
    }

    return {
        // nhận view vào và đẩy ra root
        attach(component, root){
            roots.set(root, component);
            render();
        },
        // kết nối phần store với view
        // selector dùng để lưa chọn phần dữ liệu nào được render ra
        // mặc định sẽ là state => render ra tất cả các dữ liệu
        // Object.assign merge được các object lại thành một object mới
        connect(selector = state => state){
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state),...args))
        },
        // đẩy action cho reducer kèm theo dữ liệu là args
        // reducer cần được nhận lại chính giá trị mà lần trước đó nó trả về state
        // sau đó mới nhận action và args
        // có nghĩa là reducer sẽ sửa state dựa vào action và return lại một state mới
        dispatch(action, ...args) {
            state = reducer(state, action,args);
            render();
        }
    }
}