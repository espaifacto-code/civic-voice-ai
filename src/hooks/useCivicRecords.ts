import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { CivicRecord } from "@/types/civic";
//ss
export function useCivicRecords() {
  const query = useQuery({
    queryKey: ["civic-records"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("civic_records")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data as unknown as CivicRecord[]) ?? [];
    },
    refetchInterval: 15000, // Poll every 15 seconds
    refetchIntervalInBackground: false,
    staleTime: 0,
    gcTime: 0,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("dashboard-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "civic_records" },
        (payload) => {                                              
          console.log("Supabase realtime event:", payload);
          queryClient.invalidateQueries({ queryKey: ["civic-records"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
}
