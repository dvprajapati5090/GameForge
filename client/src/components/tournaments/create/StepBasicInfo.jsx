import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { useRef, useState } from "react";

export default function StepBasicInfo({

    form,

    setForm,

    next

}) {

    const [bannerFile, setBannerFile] = useState(null);

    const fileInputRef = useRef(null);


    const update = (field, value) =>
        setForm(prev => ({
            ...prev,
            [field]: value
        }));


    return (

        <div className="space-y-6">

            <div>

                <label className="block mb-3 font-semibold">

                    Tournament Banner

                </label>


                <div className="flex items-center gap-5">


                    <img

                        src={
                            bannerFile
                                ? URL.createObjectURL(bannerFile)
                                : "https://placehold.co/600x250?text=Banner"
                        }

                        alt="Tournament Banner"

                        className="
                            w-72
                            h-32
                            rounded-xl
                            object-cover
                            border
                            border-cyan-500
                        "

                    />


                    <div>


                        <button

                            type="button"

                            onClick={() =>
                                fileInputRef.current.click()
                            }

                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-cyan-600
                                hover:bg-cyan-500
                            "

                        >

                            Choose Banner

                        </button>


                        <input

                            ref={fileInputRef}

                            type="file"

                            hidden

                            accept="image/*"

                            onChange={(e)=>{

                                const file = e.target.files[0];

                                if(file){

                                    setBannerFile(file);

                                    update(
                                        "banner",
                                        file
                                    );

                                }

                            }}

                        />


                    </div>


                </div>


            </div>


            <Input

                placeholder="Tournament Name"

                value={form.name}

                onChange={e =>
                    update(
                        "name",
                        e.target.value
                    )
                }

            />


            <select

                value={form.game}

                onChange={e =>
                    update(
                        "game",
                        e.target.value
                    )
                }

                className="
                    w-full
                    bg-white/5
                    border
                    border-white/10
                    rounded-xl
                    p-3
                "

            >

                <option>VALORANT</option>

                <option>BGMI</option>

                <option>FREE_FIRE</option>

            </select>


            <select

                value={form.mode}

                onChange={e =>
                    update(
                        "mode",
                        e.target.value
                    )
                }

                className="
                    w-full
                    bg-white/5
                    border
                    border-white/10
                    rounded-xl
                    p-3
                "

            >

                <option>SOLO</option>

                <option>DUO</option>

                <option>SQUAD</option>

                <option>5V5</option>

            </select>


            <select

                value={form.format}

                onChange={e =>
                    update(
                        "format",
                        e.target.value
                    )
                }

                className="
                    w-full
                    bg-white/5
                    border
                    border-white/10
                    rounded-xl
                    p-3
                "

            >

                <option>SINGLE_ELIMINATION</option>

            </select>


            <label className="
                block
                space-y-2
                text-sm
                font-medium
                text-slate-200
            ">

                <span>
                    Maximum teams
                </span>


                <select

                    value={form.maxTeams}

                    onChange={e =>
                        update(
                            "maxTeams",
                            Number(e.target.value)
                        )
                    }

                    className="
                        w-full
                        bg-white/5
                        border
                        border-white/10
                        rounded-xl
                        p-3
                    "

                >

                    {
                        [4,8,16,32,64,128].map(team => (

                            <option
                                key={team}
                                value={team}
                            >

                                {team} teams

                            </option>

                        ))
                    }


                </select>


            </label>


            <Button onClick={next}>

                Continue

            </Button>


        </div>

    );

}