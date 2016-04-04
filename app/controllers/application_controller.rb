class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def refresh_data
    Project.all.destroy_all
    Rails.application.load_seed
    redirect_to '/manager/'
  end
end
