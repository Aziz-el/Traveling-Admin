import { Button } from "../../shared/UI/Button/Button";
import Input from "../../shared/UI/Input/Input";
import {MapPin} from "lucide-react"
export default function Add_Tour() {
  return (
    <div className="h-full pb-10 ">
        <div className="header sticky top-0 bg-white py-4 px-8 border border-gray-100">
            <h1 className="text-[22px] font-[500] ">Добавь тур</h1>
            <h2 className="text-[16px] text-gray-500 font-[500]">Создайте новый туристический маршрут</h2>
        </div>
        <div className="adding_div flex ">
            <div className="info_div bg-white max-w-1/2 rounded-2xl border border-gray-100 py-8 px-5 ml-10 mt-4">
                <h3 className="text-[17px] text-gray-500">Информация о туре</h3>
                <div className="input flex flex-col gap-1 mt-[20px]">
                    <h4 className="text-[15px] font-[500]">Название тура</h4>
                    <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" label="Введите название тура" />
                </div>
                <div className="input flex flex-col gap-1 mt-[10px]">
                    <h4 className="text-[15px] font-[500]">Описание тура</h4>
                    <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-1 pb-8" label="Опишите тур" />
                </div>
                <div className="input flex flex-col gap-1 mt-[20px]">
                    <h4 className="text-[15px] font-[500]">Цена</h4>
                    <Input type="number" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" min={0} value={0}/>
                </div>
                 <div className="input flex flex-col gap-1 mt-[20px]">
                    <h4 className="text-[15px] font-[500]">Категория</h4>
                    <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" label="Европа" />
                </div>
                 <div className="input flex flex-col gap-1 mt-[20px]">
                    <h4 className="text-[15px] font-[500]">Компания</h4>
                    <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" label="Введите название компании" />
                </div>
                <div className="input flex flex-col gap-1 mt-[20px]">
                    <h4 className="text-[15px] font-[500]">Длительность (дней)</h4>
                    <Input type="number" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" min={0} value={0} />
                </div>
                <div className="input flex flex-col gap-1 mt-[20px]">
                    <h4 className="text-[15px] font-[500]">URL изображения</h4>
                    <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" label="https://example.com/image.jpg" />
                </div>
                <hr className=" mt-10 text-gray-300"/>
                <h3 className="text-[17px] text-gray-500 mt-10">Координаты старта</h3>
                <div className="coordinat flex">
                    <div className="input flex flex-col gap-1 mt-[20px] px-3">
                        <h4 className="text-[15px] font-[500]">Широта</h4>
                        <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" label="45.2342" />
                    </div>
                    <div className="input flex flex-col gap-1 mt-[20px]">
                        <h4 className="text-[15px] font-[500]">Долгота</h4>
                        <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" label="4.2422" />
                    </div>

                </div>
                <h3 className="text-[17px] text-gray-500 mt-10">Координаты Финиша</h3>
                <div className="coordinat flex">
                    <div className="input flex flex-col gap-1 mt-[20px] px-3">
                        <h4 className="text-[15px] font-[500]">Широта</h4>
                        <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" label="45.2342" />
                    </div>
                    <div className="input flex flex-col gap-1 mt-[20px]">
                        <h4 className="text-[15px] font-[500]">Долгота</h4>
                        <Input type="text" classname="bg-gray-100 w-full outline-none rounded-[5px] px-5 py-2" label="4.2422" />
                    </div>

                </div>

                <div className="btns mt-6 flex gap-3 justify-between max-w-[80%] mx-auto">
                    <Button variant={"default"} className="w-[170px] h-[40px] border border-gray-200 cursor-pointer" ><MapPin /> <p>Показать на карте</p></Button>
                    <Button variant={"secondary"} className="w-[170px] h-[40px] border border-gray-200 cursor-pointer bg-black text-white" ><p>Создать тур</p></Button>
                </div>
            </div>
            <div className="map  min-w-1/2 rounded-2xl border border-gray-200  ml-10 mt-4 flex flex-col justify-between ">
            
            <div className="header bg-white  rounded-t-2xl px-5 py-5 ">
                <h2 className=" text-[18px] font-[500]">Предварительный просмотр маршрута</h2>
            </div>
            <div className="middle flex flex-col items-center justify-center">
                <MapPin color="gray" size={50} />
                <p className="text-gray-400">Введите координаты и нажмите "Показать на карте"</p>
            </div>
            <div className="footer bg-white  rounded-t-2xl px-5 py-10"></div>
            </div>
        </div>
    </div>
  )
}
