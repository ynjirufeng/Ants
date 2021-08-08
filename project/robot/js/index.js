$(function () {
    load();
    getD1();

    // $("#title").on("keydown", function (event) {
    //     if (event.keyCode === 13) {
    //         //先读取本地存储原先的数据
    //         var local = getDate();
    //         //把local数组进行更新数据把最新的数据追加给local数组
    //         local.push({
    //             title: d1 + " " + $("#title").val(),
    //             done: false
    //         });
    //         //把新数组存储到本地存储
    //         saveDate(local);
    //         load();
    //         $(this).val("");
    //     }
    // });
    $("#te").on("click", function () {
        var te1 = document.getElementById("title");
        var te2 = document.getElementById("tool");
        var te3 = document.getElementById("work");
        var te4 = document.getElementById("tcp");
        if (te1.value != "" && te2.value != "" && te3.value != "" && te4.value != "") {
            //先读取本地存储原先的数据
            var local = getDate();
            //把local数组进行更新数据把最新的数据追加给local数组
            local.push({
                title: te1.value,
                tool: "刀具：" + te2.value,
                work: "工件：" + te3.value,
                tcp: "TCP：" + te4.value,
                done: false
            });
            //把新数组存储到本地存储
            saveDate(local);
            load();
            te.value = "";
        } else {
            alert("请检查参数！")
        }
    });
    //删除操作
    $("ol,ul").on("click", "a", function () {
        // alert(11)
        //先读取本地存储
        var data = getDate();
        //修改数据
        var index = $(this).attr("id");
        // splice（从哪个位置开始删，删几个）
        data.splice(index, 1);
        //保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    });
    //正在进行和已完成模块
    $("ol,ul").on("click", "input", function () {
        //先读取本地存储
        var data = getDate();
        //修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        //保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    })


    //读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("mh250");
        if (data !== null) {
            return JSON.parse(data);

        } else {
            return [];
        }
    }
    //保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("mh250", JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        //读取本地存储的数据
        var data = getDate();
        // console.log(data);
        //遍历之前要清空ol里面的元素内容
        $("ol,ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        //遍历这个数据
        $.each(data, function (i, n) {
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type = 'checkbox' checked = 'checked'>  <p>" + n.title + "</p><p>" + n.tool + "</p><p>" + n.work + "</p><p>" + n.tcp + " </p> <a href = 'javascript:;' id =" + i + "></a > </li>");

                doneCount++;
                // todoCount--;

            } else {
                $("ol").prepend("<li><input type = 'checkbox'>  <p>" + n.title + "</p><p>" + n.tool + "</p><p>" + n.work + "</p><p>" + n.tcp + " </p> <a href = 'javascript:;' id =" + i + "></a > </li>");
                todoCount++;
            }

        })
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);


    }


})