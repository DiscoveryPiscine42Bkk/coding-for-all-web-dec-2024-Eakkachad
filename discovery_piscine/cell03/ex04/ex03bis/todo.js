$(document).ready(function () {
    // เมื่อ DOM ทั้งหมดโหลดเสร็จ จะเรียกฟังก์ชัน loadToDo() เพื่อโหลดรายการที่บันทึกไว้ในคุกกี้
    loadToDo();

    // เพิ่มเหตุการณ์เมื่อคลิกปุ่ม Add To-Do
    $("#newBtn").click(function () {
        // แสดงหน้าต่าง prompt ให้ผู้ใช้กรอกข้อความ
        const todoText = prompt("Enter your TO DO:").trim(); // trim() ตัดช่องว่างหน้าและหลัง
        if (todoText) { // ตรวจสอบว่าข้อความไม่ว่างเปล่า
            addToDo(todoText); // เพิ่ม To-Do เข้า DOM
            saveToDo(); // บันทึก To-Do ลงคุกกี้
        }
    });

    // ฟังก์ชันสำหรับเพิ่ม To-Do ลงใน DOM
    function addToDo(text) {
        const toDoDiv = $("<div>").text(text); // สร้าง <div> ใหม่พร้อมข้อความที่ผู้ใช้กรอก

        // เพิ่มเหตุการณ์คลิกที่ To-Do
        toDoDiv.click(function () {
            // แสดงหน้าต่างยืนยันในการลบ To-Do
            if (confirm("Do you really want to delete this TO DO?")) {
                deleteToDo($(this)); // ลบ To-Do
            }
        });

        // เพิ่ม <div> นี้ไปที่ส่วนบนสุดของ #ft_list
        $("#ft_list").prepend(toDoDiv);
    }

    // ฟังก์ชันสำหรับลบ To-Do
    function deleteToDo(toDoDiv) {
        // ลบ <div> ออกจาก DOM
        toDoDiv.remove();
        saveToDo(); // บันทึกการเปลี่ยนแปลงลงคุกกี้
    }

    // ฟังก์ชันสำหรับบันทึก To-Do ลงในคุกกี้
    function saveToDo() {
        const toDoArray = []; // สร้างอาร์เรย์เปล่าสำหรับเก็บรายการ To-Do
        $("#ft_list div").each(function () {
            toDoArray.push($(this).text()); // ดึงข้อความจากแต่ละ <div> และเพิ่มลงอาร์เรย์
        });

        const expirationDate = new Date(); // สร้างวันที่ปัจจุบัน
        expirationDate.setDate(expirationDate.getDate() + 30); // กำหนดวันหมดอายุเพิ่มอีก 30 วัน

        // เขียนคุกกี้โดยแปลงอาร์เรย์เป็น JSON string
        document.cookie = "todo=" + encodeURIComponent(JSON.stringify(toDoArray)) +
            "; path=/; expires=" + expirationDate.toUTCString(); // เพิ่ม path=/ เพื่อให้คุกกี้ใช้ได้ทั่วทั้งเว็บ

        console.log("Saved To-Do to cookie:", document.cookie); // แสดงคุกกี้ใน console สำหรับการ debug
    }

    // ฟังก์ชันสำหรับโหลด To-Do จากคุกกี้
    function loadToDo() {
        // หา cookie ที่ชื่อว่า "todo"
        const cookie = document.cookie.split("; ").find(row => row.startsWith("todo="));
        console.log("Loaded cookie:", cookie); // แสดงค่าคุกกี้ใน console สำหรับการ debug

        if (cookie) { // ถ้าพบคุกกี้
            try {
                // แปลง JSON string จากคุกกี้กลับเป็นอาร์เรย์
                const toDoArray = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
                // เพิ่ม To-Do แต่ละรายการเข้า DOM (เรียงจากท้ายสุดไปหน้า)
                toDoArray.reverse().forEach(function (item) {
                    addToDo(item);
                });
            } catch (error) {
                console.error("Error parsing cookie:", error); // แสดงข้อความเมื่อเกิดข้อผิดพลาด
            }
        } else {
            console.log("No To-Do cookie found."); // ถ้าไม่พบคุกกี้
        }
    }
});
