class ApiController < ApplicationController
  resources_controller
  respond_to :json

  #Расскоментировать для тестирования внешних POST запросов
  #skip_before_action :verify_authenticity_token

  before_action :collection, only: :index
  before_action :resource, only: :show

  #Фикс неизвестно откуда взявшегося бага, в rabl показывало вместо коллекции просто объект класса
  def collection
    @_collection = super.all
  end
  def create
    super(action: :show)
  end
end
