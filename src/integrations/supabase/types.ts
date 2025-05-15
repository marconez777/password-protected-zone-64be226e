export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      payment_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_id: string | null
          payment_method: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      plan_limits: {
        Row: {
          created_at: string
          id: string
          keyword_limit: number | null
          market_research_limit: number | null
          metadata_generation_limit: number | null
          plan_type: Database["public"]["Enums"]["plan_type"]
          search_funnel_limit: number | null
          seo_text_limit: number | null
          topic_research_limit: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          keyword_limit?: number | null
          market_research_limit?: number | null
          metadata_generation_limit?: number | null
          plan_type: Database["public"]["Enums"]["plan_type"]
          search_funnel_limit?: number | null
          seo_text_limit?: number | null
          topic_research_limit?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          keyword_limit?: number | null
          market_research_limit?: number | null
          metadata_generation_limit?: number | null
          plan_type?: Database["public"]["Enums"]["plan_type"]
          search_funnel_limit?: number | null
          seo_text_limit?: number | null
          topic_research_limit?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          is_active: boolean
          plan_type: Database["public"]["Enums"]["plan_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_active?: boolean
          plan_type?: Database["public"]["Enums"]["plan_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_active?: boolean
          plan_type?: Database["public"]["Enums"]["plan_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_results: {
        Row: {
          data_criacao: string
          id: string
          input_original: Json
          output_gerado: Json
          tipo_recurso: string
          user_id: string
        }
        Insert: {
          data_criacao?: string
          id?: string
          input_original: Json
          output_gerado: Json
          tipo_recurso: string
          user_id: string
        }
        Update: {
          data_criacao?: string
          id?: string
          input_original?: Json
          output_gerado?: Json
          tipo_recurso?: string
          user_id?: string
        }
        Relationships: []
      }
      user_status: {
        Row: {
          approved: boolean
          is_admin: boolean | null
          user_id: string
        }
        Insert: {
          approved?: boolean
          is_admin?: boolean | null
          user_id: string
        }
        Update: {
          approved?: boolean
          is_admin?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_get_user_usage: {
        Args: { user_email: string }
        Returns: {
          email: string
          user_id: string
          keyword_count: number
          market_research_count: number
          search_funnel_count: number
          seo_text_count: number
          topic_research_count: number
          metadata_generation_count: number
        }[]
      }
      admin_list_subscriptions: {
        Args: Record<PropertyKey, never>
        Returns: {
          email: string
          user_id: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          is_active: boolean
          current_period_end: string
          updated_at: string
        }[]
      }
      admin_reset_user_usage: {
        Args: {
          user_email: string
          reset_all?: boolean
          reset_keyword?: boolean
          reset_market_research?: boolean
          reset_search_funnel?: boolean
          reset_seo_text?: boolean
          reset_topic_research?: boolean
          reset_metadata_generation?: boolean
        }
        Returns: string
      }
      admin_update_user_subscription: {
        Args: {
          user_email: string
          new_plan_type: Database["public"]["Enums"]["plan_type"]
          is_active: boolean
          expiration_date: string
        }
        Returns: string
      }
      count_pending_users: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      increment_global_usage: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_user_usage: {
        Args:
          | { resource_type: string }
          | { resource_type: string; target_user_id?: string }
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      user_has_exceeded_global_limit: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      user_has_exceeded_limit: {
        Args:
          | { resource_type: string }
          | { resource_type: string; target_user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      plan_type: "solo" | "discovery" | "escala"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      plan_type: ["solo", "discovery", "escala"],
    },
  },
} as const
