// 获取所有的城市
let citys,weatherobj;

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		citys = obj.data;
		// console.log(citys);
		for(let i in citys){
			let section = document.createElement('section');
			let citys_title = document.createElement('h1');
			citys_title.className = "citys_title";
			citys_title.innerHTML = i;
			section.appendChild(citys_title);
			// 嵌套元素appendChild
			for(let j in citys[i]){
				let citys_list = document.createElement('ul');
				citys_list.className = 'citys_list';
				let li =document.createElement('li');
				li.innerHTML = j;
				citys_list.appendChild(li);
				section.appendChild(citys_list);
			}
			$(".citys_box").append(section);

		}
		// for in数据循环
	}
})

$.getScript
("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function()
{
    getFullWeather("太原");
}
);
// 获取当前城市的所有天气信息
function getFullWeather(nowcity)
{
	$(".now_city").html(nowcity);

	// 获取当前城市的天气信息
	$.ajax
({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
	dataType:"jsonp",
	success:function(obj)
	{
		weatherobj = obj.data;
		// console.log(weatherobj);
		// // console输出weatherobj的值
		// 当前的空气质量
		$(".now_air_quality").html(weatherobj.weather.quality_level);
		// 当前的气温
		$(".now_temp_temp").html(weatherobj.weather.current_temperature);
		// 当前的天气
		$(".now_weather").html(weatherobj.weather.current_condition);
		// 当前的风向
		$(".now_wind").html(weatherobj.weather.wind_direction);
		// 当前的风级
		$(".now_wind_level").html(weatherobj.weather.wind_level+"级");

		// 近期两天的天气信息
		// 今天的温度
		$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
		$(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
		// 今天的天气
		$(".today_weather").html(weatherobj.weather.dat_condition);
		$(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");                     
		// attr属性  变量和文字用+连接  .属于

		// 明天的温度
		$(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
		$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
		// 明天的天气
		$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
		$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");

		// 未来24h的天气信息
		
		let hours_array = weatherobj.weather.hourly_forecast;
		// console.log(hours_array);
		for(let i = 0;i < hours_array.length;i++)
		{
		// 创建元素并添加到页面中
		let hours_list = document.createElement('li');
		let hours_time = document.createElement('span');
		hours_time.className = 'hours_time';

		let hours_img = document.createElement('img');
		hours_img.className = 'hours_img';

		let hours_temp = document.createElement('span');
		hours_temp.className = 'hours_temp';
		// 嵌套元素appendChild
		hours_list.appendChild(hours_time);
		hours_list.appendChild(hours_img);
		hours_list.appendChild(hours_temp);

		$('.hours_content').append(hours_list);

		// 当下的时间   内容添加innerHTML
		hours_time.innerHTML = hours_array[i].hour+":00";
		hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
		hours_temp.innerHTML = hours_array[i].temperature+"°";
		}

		// 未来一周的天气信息
		
		let weeks_array = weatherobj.weather.forecast_list;
		// console.log(weeks_array);
		for(let i = 0;i < weeks_array.length;i++)
		{
		// 创建元素并添加到页面中
		let weeks_list = document.createElement('li');
		// 日期
		let weeks_date = document.createElement('span');
		weeks_date.className = 'weeks_date';
		// 天气
		let weeks_weather = document.createElement('span');
		weeks_weather.className = 'weeks_weather';
		// 图片
		let weeks_day_img = document.createElement('img');
		weeks_day_img.className = 'weeks_day_img';
		// 最高温度
		let weeks_temp_max = document.createElement('span');
		weeks_temp_max.className = 'weeks_temp_max';
		// 最低温度
		let weeks_temp_min = document.createElement('span');
		weeks_temp_min.className = 'weeks_temp_min';
		// 风向
		let weeks_wind = document.createElement('span');
		weeks_wind.className = 'weeks_wind';
		// 风级
		let weeks_wind_level = document.createElement('span');
		weeks_wind_level.className = 'weeks_wind_level';
		// 嵌套元素appendChild
		weeks_list.appendChild(weeks_date);
		weeks_list.appendChild(weeks_weather);
		weeks_list.appendChild(weeks_day_img);
		weeks_list.appendChild(weeks_temp_max);
		weeks_list.appendChild(weeks_temp_min);
		weeks_list.appendChild(weeks_wind);
		weeks_list.appendChild(weeks_wind_level);


		$('.weeks_content').append(weeks_list);

		// 当下的时间   内容添加innerHTML
		weeks_date.innerHTML = weeks_array[i].date.substring(5,7)+"/"+weeks_array[i].date.substring(8);
		weeks_weather.innerHTML = weeks_array[i].condition;
		weeks_day_img.setAttribute('src',"img/"+weeks_array[i].weather_icon_id+".png");
		weeks_temp_max.innerHTML = weeks_array[i].high_temperature+"°";
		weeks_temp_min.innerHTML = weeks_array[i].low_temperature+"°";
		weeks_wind.innerHTML = weeks_array[i].wind_direction;
		weeks_wind_level.innerHTML = weeks_array[i].wind_level+"级";

		}

	}
})
	// $("now_air_quality").html();
}

$(function(){
	$(".now_city").on("click",function(){
		$(".search").val("");
		$(".cancel").html('取消');
		$(".citys").css("display","block");
	})

	$(".citys_list li").on("click",function(){
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})

	$("body").delegate('.citys_list li', 'click', function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})// 事件委派  动态出现的元素获取不到
	
	$("body").delegate('.citys_title', 'click', function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})

		// if($(".cancel").html() == "取消") {
		// 	$(".cancel").on("click",function(){
		// 		$(".citys").css("display","none");
		// 	})
		// }


	$(".search").on("focus",function(){
		$(".cancel").html('确认');
	})

		$(".cancel").on("click",function(){
			if(this.innerText == "取消"){
				$(".citys").css("display","none");
				console.log(this.innerText);
			}else if(this.innerText == "确认"){
				let text = $(".search").val();
				for(let i in citys){
					if(text == i){		
						getFullWeather(text);
						$(".citys").css("display","none");
						return;
						// 停止break
					}else{
						for(let j in citys[i]){
							if(text == j){
								getFullWeather(text);
								$(".citys").css("display","none");
								return;
							}
						}
					}
				}
				alert('输入地区有误');
				$(".search").val("");
				$(".cancel").html('取消');
			}
		})
	
})







		// if($(".cancel").html() == "确认"){
	// 		$(".cancel").on("click",function(){
	// 			let text = $(".search").val();
	// 			for(let i in citys){
	// 				if(text == i){
	// 					getFullWeather(text);
	// 					$(".citys").css("display","none");
	// 					return;
	// 				}else{
	// 					for(let j in city[i]){
	// 						if(text == j){
	// 							getFullWeather(text);
	// 							$(".citys").css("display","none");
	// 							return;
	// 						}else{
	// 							alert('输入城市有误');
	// 							return;
	// 						}
	// 					}
	// 				}
	// 			}
	// 			console.log(text);
	// 		})
	// 	}
	// })// 获得光标

	// $(".search").on("blur",function(){
	// 	$(".cancel").html('取消')
// 失去光标
	
// window onload =function(){

// }
// 页面加载完成以后进行


// display block
// 元素竖排
// 设置span字体大小
// 和display none结合显示隐藏

	

// console


















// .属于 =赋值