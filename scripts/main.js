const logoElem = document.querySelector(".logo");
logoElem.addEventListener("click", event => {
    scrollTo(0,0);
})

const submitBtnElem = document.querySelector('.submit-btn');

emailjs.init({
    publicKey: "XwDySYkUTx9Vmz38-",
});

document.addEventListener("DOMContentLoaded", () => {

    const formElem = document.querySelector("form");

    if (!formElem) return;

    formElem.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fd = new FormData(formElem);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
        if (
            !data.receiverName?.trim() ||
            !data.receiverPhoneNumber?.trim() ||
            !data.receiverPostCode?.trim() ||
            !data.receiverAddress?.trim() ||
            !data.orderCount ||
            !data.menu ||
            !data.senderName?.trim() ||
            !data.senderPhoneNumber?.trim() ||
            !data.paymentMethod
        ) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        console.log(`받는 분 성함: ${data.receiverName}\n
            받는 분 휴대폰 번호: ${data.receiverPhoneNumber}\n
            받는 분 우편번호: ${data.receiverPostCode}\n
            받는 분 주소: ${data.receiverAddress}\n
            세트 개수: ${data.orderCount}\n
            메뉴명: ${data.menu}\n
            결제방법: ${data.paymentMethod}
            보내는 분 성함: ${data.senderName}\n
            보내는 분 휴대폰 번호: ${data.senderPhoneNumber}`);

        try {
            if (!submitBtnElem) return;
            if (submitBtnElem) submitBtnElem.disabled = true;

            const result = await emailjs.sendForm('service_kxohfab','template_vl2k54p',formElem);
            console.log("EmailJS success:", result);

            alert("주문 내용이 접수되었습니다. 감사합니다!");

        } catch (err) {
            console.error("EmailJS failed:", err);
            alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            if (submitBtnElem) submitBtnElem.disabled = false;
        }
    });

});
