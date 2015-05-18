class TasksController < ApplicationController
  respond_to :html,:json

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    @createdUser = Task.create(content: params[:content], created_at: params[:created_at])
    render json: @createdUser
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    head :no_content
  end

  def update
    @task = Task.find(params[:id])
    @task.update(params[:content])
  end
end
