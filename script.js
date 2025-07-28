function showValue() {
    var value = document.getElementById("myInput").value;
    document.getElementById("Output").innerText = value; // 입력값을 바로 출력.
}

var item ;
if (item >= 1){
    console.log("주문을 진행합니다.");
}
else {
    console.log("품절입니다.")
}
function handleOrder() {
      // 입력 값 가져오기
      const inventory = document.getElementById('inventory').value.trim();
      const memberGrade = document.getElementById('memberGrade').value;
      const orderAmount = document.getElementById('orderAmount').value.trim();
      const deliveryOption = document.getElementById('deliveryOption').value;

      // 유효성 검사
      if (inventory === "" || isNaN(inventory) || Number(inventory) < 0) {
        alert("상품 재고를 0 이상의 숫자로 입력해 주세요.");
        return;
      }
      if (orderAmount === "" || isNaN(orderAmount) || Number(orderAmount) < 0) {
        alert("최초 주문금액을 0 이상의 숫자로 입력해 주세요.");
        return;
      }
      if (!memberGrade) {
        alert("회원 등급을 선택해 주세요.");
        return;
      }

      // 함수 호출
      processOrder(Number(inventory), memberGrade, Number(orderAmount), deliveryOption);
    }

    function processOrder(inventory, memberGrade, orderAmount, deliveryOption) {
      // 1. 재고 확인
      if (inventory < 1) {
        alert("죄송합니다. 해당 상품은 품절입니다.");
        return;
      }

      // 2. 회원 등급 할인율
      let discountRate = 0;
      if (memberGrade === "VIP") discountRate = 0.10;
      else if (memberGrade === "Gold") discountRate = 0.05;

      let discountedAmount = orderAmount * (1 - discountRate);

      // 3. 금액별 추가 할인
      if (discountedAmount >= 200000) {
        discountedAmount -= 15000;
      } else if (discountedAmount >= 100000) {
        discountedAmount -= 5000;
      }

      // 4. 배송비
      let deliveryFee = (deliveryOption === "fast") ? 3000 : 0;

      // 5. 최종 결제 금액
      let finalAmount = discountedAmount + deliveryFee;

      // 6. 메시지 출력
      alert(
        `주문이 정상적으로 완료되었습니다.\n최종 결제 금액: ${finalAmount.toLocaleString()}원`
      );
    }