
import { supabase } from '@/integrations/supabase/client';
import { PlanLimit } from '@/types/usage';

/**
 * Fetches plan limits for a plan type
 * @param planType The plan type ('solo', 'discovery', or 'escala')
 * @returns The plan limits or null if not found
 */
export async function fetchPlanLimits(planType: 'solo' | 'discovery' | 'escala'): Promise<PlanLimit | null> {
  const { data: planLimitsData, error: planLimitsError } = await supabase
    .from("plan_limits")
    .select("*")
    .eq("plan_type", planType)
    .single();

  if (planLimitsError) {
    console.error("Erro ao carregar limites do plano:", planLimitsError);
    return null;
  }

  return planLimitsData;
}
