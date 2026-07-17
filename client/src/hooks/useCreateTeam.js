import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { createTeam } from "../services/team.service";

export default function useCreateTeam() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createTeam,

        onSuccess: () => {

            toast.success("Team created successfully!");

            queryClient.invalidateQueries({

                queryKey: ["team"]

            });

            navigate("/team");

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Failed to create team"

            );

        }

    });

}